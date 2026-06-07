import { commandToken } from "../shell/format";

const createDefault = () : string[] => {
  const defaultMsgArr = [
    "<br>",
    "COMMAND NOT FOUND",
    `Type ${commandToken("'help'")} to get started.`,
    "<br>"
  ]  
  
  const defaultMsg : string[] = [];
  
  defaultMsgArr.forEach((ele) => {
    defaultMsg.push(ele);
  })

  return defaultMsg;
}

export const DEFAULT = createDefault();
