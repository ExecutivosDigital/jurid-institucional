import Field from "@/components/Field";
import { Form, FormField, FormItem, FormMessage } from "@/components/Form/form";
import { TermsModal } from "@/components/termsModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiContext } from "context/ApiContext";
import { maskCep, maskCpfCnpj, maskPhone } from "lib/masks";
import { cn } from "lib/utils";
import {
  Hash,
  House,
  List,
  Loader2,
  MapPin,
  MapPinHouse,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
const FirstFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  mobilePhone: z.string().min(11, "Telefone deve ter pelo menos 11 caracteres"),
  email: z.email({ message: "Email Inválido" }),
  password: z
    .object({
      password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
      confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Senhas não coincidem",
      path: ["confirm"],
    }),
});

const SecondFormSchema = z.object({
  lawFirmName: z.string().min(1, "Nome do escritório é obrigatório"),
  cpfCnpj: z
    .object({
      cpf: z.string().optional(),
      lawFirmCnpj: z.string().optional(),
    })
    .refine((data) => data.cpf || data.lawFirmCnpj, {
      message: "Preencha CPF ou CNPJ",
      path: ["cpf"],
    }),
  paymentType: z.enum(["CPF", "CNPJ"]),
  postalCode: z.string().min(1, "CEP é obrigatório"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
});

const FormSchema = z.object({
  ...FirstFormSchema.shape,
  ...SecondFormSchema.shape,
});

const CreateAccount = () => {
  const { PostAPI, addressApi } = useApiContext();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [tempCpfCnpj, setTempCpfCnpj] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [tempCep, setTempCep] = useState("");
  const [isTermModalOpen, setIsTermModalOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      mobilePhone: "",
      email: "",
      password: {
        password: "",
        confirm: "",
      },
      lawFirmName: "",
      cpfCnpj: {
        cpf: "",
        lawFirmCnpj: "",
      },
      paymentType: "CPF",
      postalCode: "",
      address: "",
      number: "",
    },
  });

  const useFormSteps = (form: UseFormReturn<z.infer<typeof FormSchema>>) => {
    const [activeStep, setActiveStep] = useState(0);

    const stepFields = {
      0: [
        "name",
        "mobilePhone",
        "email",
        "password.password",
        "password.confirm",
      ] as const,
      1: [
        "lawFirmName",
        "cpfCnpj.cpf",
        "cpfCnpj.lawFirmCnpj",
        "paymentType",
        "postalCode",
        "address",
        "number",
      ] as const,
    };

    const validateStep = async (step: number) => {
      const fields = stepFields[step as keyof typeof stepFields];
      if (!fields) return true;
      return await form.trigger(fields);
    };

    return { activeStep, validateStep, setActiveStep };
  };

  const { validateStep } = useFormSteps(form);

  const handleNext = async (
    form: UseFormReturn<z.infer<typeof FormSchema>>
  ) => {
    if (currentStep === 0) {
      const isValid = await validateStep(currentStep);
      if (!isValid) {
        const errors = form.formState.errors;

        const fieldLabels: Record<
          keyof z.infer<typeof FirstFormSchema>,
          string | Record<"password" | "confirm", string>
        > = {
          name: "Nome",
          mobilePhone: "Telefone",
          email: "Email",
          password: {
            password: "Senha",
            confirm: "Confirmar Senha",
          },
        };

        const firstErrorField = Object.keys(
          errors
        )[0] as keyof typeof fieldLabels;
        const firstError = errors[firstErrorField];

        if (firstError?.message && firstErrorField in fieldLabels) {
          const fieldLabel = fieldLabels[firstErrorField];
          return toast.error(`${fieldLabel}: ${firstError.message}`);
        }

        return toast.error("Por favor, corrija os erros no formulário.");
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 1) {
      const isValid = await validateStep(currentStep);
      if (!isValid) {
        const errors = form.formState.errors;

        const fieldLabels: Record<
          keyof z.infer<typeof SecondFormSchema>,
          string
        > = {
          lawFirmName: "Nome do Escritório",
          cpfCnpj: "CPF ou CNPJ",
          paymentType: "Tipo de pagamento",
          postalCode: "CEP",
          address: "Endereço",
          number: "Número",
        };

        const secondErrorField = Object.keys(
          errors
        )[0] as keyof typeof fieldLabels;
        const secondError = errors[secondErrorField];

        if (secondError?.message && secondErrorField in fieldLabels) {
          const fieldLabel = fieldLabels[secondErrorField];
          return toast.error(`${fieldLabel}: ${secondError.message}`);
        }

        return toast.error("Por favor, corrija os erros no formulário.");
      } else {
        setIsCreating(true);
        const create = await PostAPI(
          "/lawyer/register",
          {
            ...form.getValues(),
            phone: form.getValues("mobilePhone"),
            cpf: form.getValues("cpfCnpj.cpf"),
            lawFirmCnpj: form.getValues("cpfCnpj.lawFirmCnpj"),
            password: form.getValues("password.password"),
            trial: true,
          },
          false
        );
        if (create.status === 200) {
          window.open(
            `https://app.juridia.com.br?token=${create.body.accessToken}`,
            "_self"
          );

          return setIsCreating(false);
        }
        toast.error("Erro ao cadastrar, tente novamente.");
        return setIsCreating(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNext(form);
    }
  };

  async function GetAddressData() {
    const data = await addressApi(`${tempCep}/json`);
    if (data.status === 200) {
      form.setValue("address", data.body.logradouro + ", " + data.body.bairro);
      form.setValue("postalCode", tempCep);
    }
  }

  useEffect(() => {
    if (tempCpfCnpj) {
      if (tempCpfCnpj.length === 14) {
        form.setValue("cpfCnpj.cpf", tempCpfCnpj);
        form.setValue("cpfCnpj.lawFirmCnpj", "");
        form.setValue("paymentType", "CPF");
      } else if (tempCpfCnpj.length === 18) {
        form.setValue("cpfCnpj.cpf", "");
        form.setValue("cpfCnpj.lawFirmCnpj", tempCpfCnpj);
        form.setValue("paymentType", "CNPJ");
      } else {
        form.setValue("cpfCnpj.cpf", "");
        form.setValue("cpfCnpj.lawFirmCnpj", "");
      }
    }
  }, [tempCpfCnpj, form]);

  useEffect(() => {
    if (tempCep.length === 9) {
      GetAddressData();
    } else {
    }
  }, [tempCep]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-4" onKeyDown={handleKeyPress}>
        {currentStep === 0 ? (
          <>
            <FormField
              key="name"
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Nome"
                    Svg={User}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="mobilePhone"
              name="mobilePhone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Telefone"
                    Svg={Phone}
                    icon="mobilePhone"
                    value={maskPhone(field.value)}
                    onChange={(e: any) => field.onChange(e.target.value)}
                    required
                    maxLength={15}
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="email"
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Email"
                    icon="email"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="password.password"
              name="password.password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Senha"
                    icon="lock"
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="password.confirm"
              name="password.confirm"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Senha"
                    icon="lock"
                    type="password"
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
          </>
        ) : currentStep === 1 ? (
          <>
            <FormField
              key="lawFirmName"
              name="lawFirmName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Nome do escritório"
                    Svg={House}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <div>
              <Field
                classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                placeholder="CPF/CNPJ de faturamento"
                Svg={Hash}
                value={tempCpfCnpj}
                onChange={(e: { target: { value: string } }) =>
                  setTempCpfCnpj(maskCpfCnpj(e.target.value))
                }
                required
                maxLength={18}
              />
              {form.formState.errors.cpfCnpj?.cpf && (
                <p className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500">
                  {form.formState.errors.cpfCnpj.cpf.message}
                </p>
              )}
            </div>
            <FormField
              key="postalCode"
              name="postalCode"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="CEP"
                    icon="name"
                    Svg={MapPin}
                    value={tempCep}
                    onChange={(e: { target: { value: string } }) =>
                      setTempCep(maskCep(e.target.value))
                    }
                    maxLength={9}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="address"
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Endereço"
                    icon="name"
                    Svg={MapPinHouse}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              key="number"
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Field
                    classInput="dark:bg-n-6 dark:border-n-7 dark:focus:bg-transparent"
                    placeholder="Número"
                    icon="name"
                    Svg={List}
                    value={field.value}
                    onChange={field.onChange}
                    required
                  />
                  <FormMessage className="font-base inline-flex h-[22px] items-center justify-center rounded-sm px-2 text-xs text-red-500" />
                </FormItem>
              )}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="w-full mt-4 flex items-center gap-4">
        <button
          onClick={() => setCurrentStep(0)}
          className={cn(
            "btn-secondary text-secondary-1 hover:text-white bg-transparent border-secondary btn-large  mb-6",
            currentStep === 0 && "hidden"
          )}
        >
          Voltar
        </button>
        <button
          onClick={() => handleNext(form)}
          disabled={isCreating}
          className="btn-secondary btn-large w-full mb-6"
        >
          {isCreating ? (
            <Loader2 className="animate-spin" />
          ) : currentStep === 0 ? (
            "Próximo"
          ) : (
            "Fazer parte da Jurid IA"
          )}
        </button>
      </div>
      <div className="text-center caption1 text-n-4">
        Ao criar uma conta, você aceita nossos{" "}
        <button
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          onClick={() => setIsTermModalOpen(true)}
        >
          Termos de Serviço
        </button>{" "}
        e nossa{" "}
        <button
          className="text-n-5 transition-colors hover:text-n-7 dark:text-n-3 dark:hover:text-n-1"
          onClick={() => setIsTermModalOpen(true)}
        >
          Política de Privacidade
        </button>
        .
      </div>
      <TermsModal
        onClose={() => setIsTermModalOpen(false)}
        visible={isTermModalOpen}
      />
    </Form>
  );
};

export default CreateAccount;
