export const convertAmountToNumber = (amount: string): number => {
  return parseFloat(
    amount
      ?.replace("R$", "")
      ?.replace(".", "")
      ?.replace(",", ".")
      ?.replace(/\s/g, "") // Remove spaces
  );
};

export const convertAmountToBRL = (amount: number): string => {
  return amount.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};
