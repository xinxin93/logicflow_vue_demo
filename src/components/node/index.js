import TaskNode from './TaskNode'
import StartNode from './StartNode'
import EndNode from './EndNode'
// import UserNode from './UserNode'

export const registerCustomElement = (lf) => {
  lf.register(TaskNode)
  lf.register(StartNode)
  lf.register(EndNode)
  // lf.register(UserNode)
}