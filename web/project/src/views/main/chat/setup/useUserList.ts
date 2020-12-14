import { ref, toRefs, reactive, Ref } from 'vue'

type User = {
  name: string;
  id: string;
  avatar: string;
}

type UserList = Array<User>

interface UseUserList {
  userList: Ref<UserList>;
  toUpdateList: any;
}

export default function (): UseUserList {
  const userList = ref<UserList>([])
  const toUpdateList = async function (updateList: UserList) {
    userList.value = updateList
  }
  return {
    userList,
    toUpdateList
  }
}
