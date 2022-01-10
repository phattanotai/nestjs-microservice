import { MutationTree } from "vuex";
import { AuthMutationType } from "./mutation-types";
import { State, TaskItem } from "./state";

export type Mutations = {
  [AuthMutationType.CreateTask](state: State, task: TaskItem): void;
  [AuthMutationType.SetTasks](state: State, tasks: TaskItem[]): void;
  [AuthMutationType.CompleteTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;
  [AuthMutationType.RemoveTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;
  [AuthMutationType.EditTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;
  [AuthMutationType.UpdateTask](
    state: State,
    task: Partial<TaskItem> & { id: number }
  ): void;

  [AuthMutationType.SetLoading](state: State, value: boolean): void;
  [AuthMutationType.SetCreateModal](state: State, value: boolean): void;
  [AuthMutationType.SetEditModal](
    state: State,
    value: { showModal: boolean; taskId: number | undefined }
  ): void;
  [AuthMutationType.SetTaskModal](
    state: State,
    value: { showModal: boolean; taskId: number | undefined }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [AuthMutationType.CreateTask](state, task) {
    state.tasks.unshift(task);
  },
  [AuthMutationType.SetTasks](state, tasks) {
    state.tasks = tasks;
  },
  [AuthMutationType.CompleteTask](state, newTask) {
    const task = state.tasks.findIndex((element) => element.id === newTask.id);
    if (task === -1) return;
    state.tasks[task] = { ...state.tasks[task], ...newTask };
  },
  [AuthMutationType.RemoveTask](state, Task) {
    const task = state.tasks.findIndex((element) => element.id === Task.id);
    if (task === -1) return;
    //If Task exist in the state, remove it
    state.tasks.splice(task, 1);
  },
  [AuthMutationType.EditTask](state, Task) {
    const task = state.tasks.findIndex((element) => element.id === Task.id);
    if (task === -1) return;
    //If Task exist in the state, toggle the editing property
    state.tasks[task] = {
      ...state.tasks[task],
      editing: !state.tasks[task].editing,
    };
    console.log("taskino", state.tasks[task]);
  },
  [AuthMutationType.UpdateTask](state, Task) {
    state.tasks = state.tasks.map((task) => {
      if (task.id === Task.id) {
        return { ...task, ...Task };
      }
      return task;
    });
  },

  [AuthMutationType.SetLoading](state, value) {
    state.loading = value;
    console.log("I am loading...");
  },
  [AuthMutationType.SetCreateModal](state, value) {
    state.showCreateModal = value;
  },
  [AuthMutationType.SetEditModal](state, value) {
    state.showEditModal = value.showModal;
    state.editModalTaskId = value.taskId;
  },
  [AuthMutationType.SetTaskModal](state, { showModal, taskId }) {
    state.showTaskModal = showModal;
    state.showTaskId = taskId;
  },
};
