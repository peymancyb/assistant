import React from 'react';
import Text from "../../components/Text";

interface IAssistantAvatarProps {
  assistantName: string;
  gender: string;
  colorScheme: number;
  isEditing: boolean;
  onToggleEdit: () => void;
  onRemove: () => void;
}

function AssistantAvatar({
  assistantName,
  gender,
  colorScheme,
  isEditing,
  onToggleEdit,
  onRemove
}: IAssistantAvatarProps) {
  const text = isEditing ? "hide" : "show";
  const visibility = isEditing ? "show" : "hide";

  return (
    <div className="assistant-row-container">
      <div className="assistant-avatar">
        <img
          src={require(`../../assets/logos/${gender}-${colorScheme}.svg`)}
          alt=""
          width={60}
          height={60}
        />
        <Text>{assistantName}</Text>
      </div>
      <div className="assistant-container-options">
        <>
          <Text className={`visible-${visibility}`}>Edit</Text>
          <Text onClick={onRemove} className={`visible-${visibility}`}>Remove</Text>
        </>
        <p onClick={onToggleEdit}>{text}</p>
      </div>
    </div>
  );
}

export default AssistantAvatar;