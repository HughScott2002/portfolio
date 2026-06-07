import command from '../../config.json' assert {type: 'json'};
import { asciiLine, commandToken, link, row } from '../shell/format';

const createBanner = () : string[] => {
  const banner : string[] = [];
  banner.push("<br>")
  command.ascii.forEach((ele) => {
    banner.push(asciiLine(ele));
  });  
  banner.push("<br>");
  banner.push(command.aboutGreeting);
  banner.push("<br>");
  banner.push(row("<i class='fa-solid fa-envelope'></i> Email", link(command.social.email, `mailto:${command.social.email}`), 17, "Email".length, 3));
  banner.push(row("<i class='fa-brands fa-github'></i> Github", link(`github/${command.social.github}`, `https://github.com/${command.social.github}`), 17, "Github".length, 3));
  banner.push(row("<i class='fa-brands fa-linkedin'></i> Linkedin", link(`linkedin/${command.social.linkedin}`, `https://www.linkedin.com/in/${command.social.linkedin}`), 17, "Linkedin".length, 3));
  banner.push("<br>");
  banner.push(`Type ${commandToken("'help'")} or ${commandToken("'ls'")} for a list of all available commands.`);
  banner.push(`Type ${commandToken("'dark'")}, ${commandToken("'light'")}, or ${commandToken("'system'")} to change the theme.`);
  banner.push(`Type ${commandToken("'contact'")} to start an email.`);
  banner.push(`Type ${commandToken("'repo'")} to view the GitHub repository or click ${link("here", command.repoLink)}.`);
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();
