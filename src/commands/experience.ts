import command from '../../config.json' assert {type: 'json'};
import { commandToken, countLine, row } from '../shell/format';

const createExperience = () : string[] => {
  const experience : string[] = [];

  experience.push("<br>");

  command.experience.forEach((ele) => {
    experience.push(row(commandToken(ele[0]), `${ele[2]} - ${ele[1]}`, 18, ele[0].length));
  });

  experience.push("<br>");
  experience.push(countLine(command.experience.length));
  experience.push("<br>");
  return experience;
}

export const EXPERIENCE = createExperience();
