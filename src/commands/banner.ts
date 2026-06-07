import command from '../../config.json' assert {type: 'json'};
import { asciiBlock, bannerContactList, bannerRow, commandHint, commandToken, link, rowLabel } from '../shell/format';

const createBanner = (): string[] => {
  const banner: string[] = [];
  banner.push("<br>")
  banner.push(asciiBlock(command.ascii));
  banner.push("<br>");
  banner.push(command.aboutGreeting);
  banner.push("<br>");
  banner.push(bannerContactList([
    bannerRow(rowLabel("fa-solid fa-envelope", "Email"), link(command.social.email, `mailto:${command.social.email}`)),
    bannerRow(rowLabel("fa-brands fa-github", "Github"), link(`github/${command.social.github}`, `https://github.com/${command.social.github}`)),
    bannerRow(rowLabel("fa-brands fa-linkedin", "Linkedin"), link(`www.linkedin.com/in/${command.social.linkedin}`, `https://www.linkedin.com/in/${command.social.linkedin}`)),
  ]));
  banner.push("<br>");
  banner.push(commandHint(`${commandToken("'help'")} or ${commandToken("'ls'")}`, " for a list of all available commands."));
  banner.push(commandHint(`${commandToken("'dark'")}, ${commandToken("'light'")}, or ${commandToken("'system'")}`, " to change the theme."));
  banner.push(commandHint(commandToken("'contact'"), " to start an email."));
  banner.push(commandHint(commandToken("'git'"), ` to view my Github or click ${link("here", command.repoLink)}`));
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();
