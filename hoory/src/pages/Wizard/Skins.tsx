import React from "react";

const color_schemes = [
  "purple",
  "green",
  "orange",
  "red",
  "blue",
  "orchid",
  "royal",
];

interface ISkinsProps {
  onColorSchemeChange: (colorSheme: number) => void;
  colorScheme: number;
}

function Skins({ colorScheme, onColorSchemeChange }: ISkinsProps) {
  return (
    <div className="scheme-selector-container">
      {color_schemes.map((schemeSkin, index) => {
        const skinIndex = index + 1;
        const isActive = skinIndex === colorScheme;
        const skinContainerClass = `skin-container ${
          isActive && `${schemeSkin}-scheme-active`
        }`;
        return (
          <div
            key={`scheme-${schemeSkin}-${index}`}
            className={skinContainerClass}
          >
            <div
              onClick={() => onColorSchemeChange(skinIndex)}
              className={`${schemeSkin}-scheme`}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Skins;
