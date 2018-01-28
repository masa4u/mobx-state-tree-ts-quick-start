import { types, getRoot, destroy } from 'mobx-state-tree';

const User = types
  .model({
    name: types.string,
    age: types.number
  })
  .actions(self => ({
    remove() {
      getRoot(self).removeTodo(self);
    },
    changeName(name: string) {
      self.name = name;
    },
    plusAge() {
      self.age = self.age + 1;
    },
    minusAge() {
      self.age = self.age - 1;
    }
  }));

const UserStore = types
  .model({
    users: types.array(User)
  })
  .views(self => ({
    get allUsers() {
      return self.users;
    }
  }))
  .actions(self => ({
    removeUser(user: IUser) {
      destroy(user);
    }
  }));

export type IUserStore = typeof UserStore.Type;
export type IUser = typeof User.Type;

export default UserStore;
