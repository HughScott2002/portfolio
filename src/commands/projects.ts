import command from '../../config.json' assert {type: 'json'};
import { countLine, link, row } from '../shell/format';

const createProject = () : string[] => {
  const projects : string[] = [];

  projects.push("<br>")

  command.projects.forEach((ele) => {
    projects.push(row(link(ele[0], ele[2]), ele[1], 17, ele[0].length));
  });

  projects.push("<br>");
  projects.push(countLine(command.projects.length));
  projects.push("<br>");
  return projects
}

export const PROJECTS = createProject()
