import { getTokenCookieName, getTokenCookieOptions } from "lib/auth-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  // /plans saiu da proteção em 27/08/2026: virou página PÚBLICA de seleção de
  // planos (a compra acontece no checkout da VSL, sem login — o acesso chega
  // por e-mail). Exigir token aqui jogava o visitante para o sign-in do app.
  matcher: ["/thanks", "/courses", "/checkout/:id"],
};

const loginVerifyAPI = async ({
  token,
  ignoreSignatureValidation = false,
}: {
  token: string;
  ignoreSignatureValidation?: boolean;
}) => {
  if (!token) {
    return {
      status: 400,
      body: null,
    };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "any",
    },
  };

  // 2.1. Validação do Token de Login (PATCH /lawyer/token)
  const connect = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/lawyer/token`,
    {
      method: "PATCH",
      headers: config.headers,
    }
  );

  const data = await connect.json();
  const status = connect.status;

  // Se o token de login for válido (Status 200)
  if (status === 200) {
    // 2.2. Se for para IGNORAR a validação de assinatura (rota /checkout)
    if (ignoreSignatureValidation) {
      return {
        status: 200,
        body: {
          // Assume que a assinatura está OK para permitir acesso à página de checkout
          isSignature: true,
          token: data.accessToken,
        },
      };
    }

    // 2.3. Lógica de validação de assinatura (GET /signature/validation)
    const signatureValidation = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/signature/validation`,
      {
        method: "GET",
        headers: config.headers,
      }
    );
    const signatureStatus = signatureValidation.status;

    return {
      // Retorna o status da validação da assinatura
      status: signatureStatus,
      body: {
        isSignature: true,
        token: data.accessToken,
      },
    };
  }

  // Retorna o status de erro de login
  return {
    status,
    body: data,
  };
};

// 3. Middleware Principal
export async function middleware(req: NextRequest) {
  // Ignora arquivos estáticos (ícones, etc.)
  if (
    req.nextUrl.pathname.indexOf("icon") > -1 ||
    req.nextUrl.pathname.indexOf("chrome") > -1 ||
    req.nextUrl.pathname.match(/\.(png|jpe?g|gif|svg|webp)$/)
  )
    return NextResponse.next();

  // Rotas PÚBLICAS do fluxo novo (27/08/2026) — guarda no CORPO, além do
  // matcher, porque o matcher não é hot-reloaded pelo `next dev`: a config
  // velha continuou protegendo /plans e mandou visitante pro sign-in do app.
  //   /plans    → redirect para /contratar (página de planos)
  //   /checkout → checkout público portado da VSL (sem login; /checkout/:id
  //               é o legado e segue protegido)
  if (
    req.nextUrl.pathname === "/plans" ||
    req.nextUrl.pathname === "/checkout"
  )
    return NextResponse.next();

  // 3.1. Obter Token
  const queryToken = req.nextUrl.searchParams.get("token");
  const cookieStore = cookies();
  const tokenCookieName = getTokenCookieName();
  const token = queryToken
    ? queryToken
    : cookieStore.get(tokenCookieName)?.value;

  // 3.2. Não Logado: Redirecionar para /sign-in
  if (!token) return NextResponse.redirect("https://app.juridia.com.br/sign-in?register");

  // 3.3. Rotas que ignoram validação de assinatura (checkout, planos, cursos)
  // Fluxo futuro (contas novas → home/cursos): incluir req.nextUrl.pathname === "/" ||
  const isCheckoutOrPlanRoute =
    req.nextUrl.pathname.startsWith("/checkout") ||
    req.nextUrl.pathname === "/plans" ||
    req.nextUrl.pathname === "/courses";

  // 3.4. Chamar API de Verificação
  const connect = await loginVerifyAPI({
    token: token,
    // Ignora a validação de assinatura se estiver em /checkout
    ignoreSignatureValidation: isCheckoutOrPlanRoute,
  });

  // 3.5. Lógica de Resposta

  // Caso de SUCESSO (Token de Login OK, e Assinatura OK ou em /checkout)
  if (connect.status === 200) {
    // Cria uma resposta para avançar e atualiza o cookie com o novo token
    const res = NextResponse.next();
    if (connect.body && connect.body.token) {
      const cookieOptions = getTokenCookieOptions(true);
      res.cookies.set(getTokenCookieName(), connect.body.token, {
        path: cookieOptions.path,
        expires: cookieOptions.expires,
        sameSite: cookieOptions.sameSite,
        ...(cookieOptions.secure && { secure: true }),
      });
    }
    return res; // Retorna a resposta que define o cookie e continua
  }

  // Caso de FALHA (Status diferente de 200)

  // A. Falha de Login (inclui falha na rota /checkout)
  // Se o token principal falhou (e não temos isSignature no body, ou status != 200)
  if (connect.status !== 200 && !connect.body?.isSignature) {
    return NextResponse.redirect("https://app.juridia.com.br/sign-in?register");
  }

  // B. Falha de Assinatura (Status diferente de 200 na validação de assinatura)
  // Se a falha é por falta de assinatura (connect.body.isSignature é true)
  // E NÃO estamos na rota /checkout (que não deveria falhar aqui por causa do ignoreSignatureValidation)
  if (
    !isCheckoutOrPlanRoute &&
    connect.status !== 200 &&
    connect.body?.isSignature
  ) {
    // Redireciona para checkout
    return NextResponse.redirect(new URL("/plans", req.url));
  }

  // Retorna NextResponse.next() como fallback (embora os casos 3.5 e A. cubram a maioria dos fluxos)
  return NextResponse.next();
}
