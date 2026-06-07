import command from '../../config.json' assert {type: 'json'};

const createExperience = () : string[] => {
  let string = "";
  const experience : string[] = [];
  const files = `${command.experience.length} File(s)`;
  const SPACE = "&nbsp;";

  experience.push("<br>");

  command.experience.forEach((ele) => {
    string += SPACE.repeat(2);
    string += `<span class='command'>${ele[0]}</span>`;
    string += SPACE.repeat(Math.max(2, 18 - ele[0].length));
    string += `${ele[2]} - ${ele[1]}`;
    experience.push(string);
    string = "";
  });

  experience.push("<br>");
  experience.push(files);
  experience.push("<br>");
  return experience;
}

export const EXPERIENCE = createExperience();
