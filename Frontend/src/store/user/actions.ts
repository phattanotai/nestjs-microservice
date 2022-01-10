import { ActionContext, ActionTree } from "vuex";
import { Mutations } from "./mutations";
import { State } from "./state";
import { AuthActionTypes } from "./action-types";
import { AuthMutationType } from "./mutation-types";

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [AuthActionTypes.GetTaskItems](context: ActionAugments): void;
  [AuthActionTypes.SetCreateModal](context: ActionAugments): void;
  [AuthActionTypes.SetEditModal](context: ActionAugments): void;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const actions: ActionTree<State, State> & Actions = {
  async [AuthActionTypes.GetTaskItems]({ commit }) {
    commit(AuthMutationType.SetLoading, true);

    await sleep(1000);

    commit(AuthMutationType.SetLoading, false);
    commit(AuthMutationType.SetTasks, [
      {
        id: 1,
        title: "Create a new programming language",
        description:
          "The programing language should have full typescript support ",
        createdBy: "Emmanuel John",
        assignedTo: "Saviour Peter",
        completed: false,
        editing: false,
      },
    ]);
  },

  async [AuthActionTypes.SetCreateModal]({ commit }) {
    commit(AuthMutationType.SetCreateModal, true);
  },
  async [AuthActionTypes.SetEditModal]({ commit }) {
    commit(AuthMutationType.SetEditModal, { showModal: true, taskId: 1 });
  },
};
