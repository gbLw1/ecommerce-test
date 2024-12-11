import clsx from "clsx";
import { ComponentPropsWithoutRef } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
} from "react-hook-form";
import { CurrencyInput } from "input-currency-react";

interface Props extends ComponentPropsWithoutRef<"input"> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  errors?: FieldErrors;
  name: string;
  validation: RegisterOptions;
  label?: string;
  disabled?: boolean;
}

const InputCurrency = ({
  control,
  errors,
  name,
  validation,
  className = "",
  label,
  disabled,
}: Props) => {
  return (
    <>
      {label && (
        <label
          className="mb-1 form-label font-semibold text-sm text-zinc-700"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          ...validation,
          validate: {
            positiveValue: (value) => {
              const valor = parseFloat(
                value.replace("R$", "").replace(",", ".")
              );
              return valor > 0 || "O valor deve ser maior que zero";
            },
            ...validation.validate,
          },
        }}
        render={({ field: { onChange, value } }) => (
          <div className="flex items-center justify-between">
            <CurrencyInput
              className={clsx(
                `${className} w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 px-2 py-1`,
                errors &&
                  errors[name] &&
                  "border-b-2 !border-rose-600 text-rose-600"
              )}
              value={value}
              options={{
                style: "currency",
                allowNegative: false,
                precision: 2,
              }}
              style={{ textAlign: "left" }}
              onChangeEvent={(_, maskedValue) => {
                onChange(maskedValue);
              }}
              required={true}
              disabled={disabled}
            />
          </div>
        )}
      />

      {errors && errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </>
  );
};

export default InputCurrency;
