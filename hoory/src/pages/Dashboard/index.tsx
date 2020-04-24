import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUserWorkspaces,
  logoutUser,
  removeWorkspace,
  updateWorkspace,
} from "../../store/actions";
import { IStoreState, IWorkspace, IUser } from "../../store/reducers";
import Button, { ButtonTypes, ButtonSize } from "../../components/Button";
import Text, { TextType } from "../../components/Text";
import Avatar from "../../assets/avatar.png";
import TextInput from "../../components/TextInput";
import If from "../../components/If";
import { useHistory } from "react-router-dom";
import AssistantAvatar from "./AssistantAvatar";
import { Routes } from "../routes";

interface IAssistant extends IWorkspace {
  isEditing: boolean;
}
interface IDashboard {
  getUserWorkspaces: () => Promise<any>;
  removeWorkspace: (workspaceId: string) => Promise<any>;
  updateWorkspace: (workspaceId: string) => Promise<any>;
  logoutUser: () => void;
  workspaces: IWorkspace[];
  user: IUser;
}

function Dashboard({
  getUserWorkspaces,
  updateWorkspace,
  workspaces,
  user,
  logoutUser,
  removeWorkspace,
}: IDashboard) {
  const history = useHistory();
  const [assistantList, setAssistantList] = useState<IAssistant[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    setLoading(true);
    getUserWorkspaces().finally(() => {
      setLoading(false);
    });
  }, [getUserWorkspaces]);

  useEffect(() => {
    const modifiedAssistantList = workspaces.map((assistant) => ({
      ...assistant,
      isEditing: false,
    }));
    setAssistantList(modifiedAssistantList);
  }, [workspaces]);

  const getAssistantList = () => {
    if (!searchKey.length) {
      return assistantList;
    }
    return assistantList.filter(
      ({ assistantName }) => assistantName.indexOf(searchKey) !== -1
    );
  };

  const onRemoveWorkspace = async (workspaceId: string) => {
    try {
      await removeWorkspace(workspaceId);
    } catch (err) {
      console.log("error => ", err);
    }
  };

  /** TODO */
  // const onEditWorkspace = async (workspaceId: string) => {
  //   try {
  //     await updateWorkspace(workspaceId);
  //   } catch (err) {
  //     console.log('error => ', err);
  //   }
  // }

  const toggleEdit = (workspaceId: string) => {
    setAssistantList((prevList) =>
      prevList.map((currentAssistant) => {
        if (currentAssistant.workspaceId !== workspaceId)
          return currentAssistant;
        const assistant = { ...currentAssistant };
        assistant.isEditing = !assistant.isEditing;
        return assistant;
      })
    );
  };

  const onAddWorkspace = () => {
    history.push(Routes.CREATE_WORKSPACE);
  };

  const onLogout = () => {
    logoutUser();
    history.push(Routes.LOGIN);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="flex-center-row">
          <div>
            <img className="user-avatar" src={Avatar} alt="avatar" />
          </div>
          <div style={{ marginLeft: 10 }}>
            <Text type={TextType.bold}>
              {user.firstName} {user.lastName}
            </Text>
            <Text>{user.email}</Text>
          </div>
        </div>
        <div>
          <Button
            type={ButtonTypes.secondary}
            size={ButtonSize.medium}
            onClick={onLogout}
          >
            <p>Logout</p>
          </Button>
        </div>
      </div>
      <div className="dashbaord-content">
        <If condition={loading}>
          <Text>Loading...</Text>
        </If>
        <If condition={!loading && !workspaces.length}>
          <Text>Empty list</Text>
        </If>
        <If condition={!loading}>
          <>
            <TextInput
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder="search"
            />
            <div className="assistant-container">
              {getAssistantList().map((assistant) => {
                const { workspaceId, isEditing, ...rest } = assistant;
                return (
                  <AssistantAvatar
                    key={workspaceId}
                    onRemove={() => onRemoveWorkspace(workspaceId)}
                    onToggleEdit={() => toggleEdit(workspaceId)}
                    isEditing={isEditing}
                    {...rest}
                  />
                );
              })}
            </div>
          </>
        </If>
        <If condition={!loading}>
          <Button
            className="add-workspace"
            size={ButtonSize.large}
            type={ButtonTypes.secondary}
            onClick={onAddWorkspace}
          >
            + Add workspace
          </Button>
        </If>
      </div>
      <div className="dashboard-footer" />
    </div>
  );
}

const mapStateToProps = (state: IStoreState) => ({
  workspaces: state.workspaces,
  user: state.user,
});

const mapDispatchToProps = {
  getUserWorkspaces,
  logoutUser,
  removeWorkspace,
  updateWorkspace,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
