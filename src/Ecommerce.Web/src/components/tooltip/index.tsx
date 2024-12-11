import React from "react";
import { Tooltip } from "react-tooltip";

interface TooltipButtonProps {
  id: string;
  text: string;
  place?: "top" | "right" | "bottom" | "left";
}

/**
 * Componente de botão com tooltip.
 * @param id ID do tooltip, necessário informar `data-tooltip-id` no elemento que irá exibir o tooltip.
 * @param text Texto do tooltip.
 * @param place Posição do tooltip.
 * @returns Componente tooltip.
 */
const TooltipButton: React.FC<TooltipButtonProps> = ({
  id,
  text,
  place = "top",
}) => {
  return (
    <Tooltip id={id} place={place}>
      {text}
    </Tooltip>
  );
};

export default TooltipButton;
