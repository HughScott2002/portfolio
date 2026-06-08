import command from '../../config.json' assert {type: 'json'};
import { asciiBlock, bannerContactList, bannerLink, bannerRow, commandHint, commandToken, link, rowLabel } from '../shell/format';

export const BANNER_HINTS = [
  commandHint(`${commandToken("'help'")} or ${commandToken("'ls'")}`, " for a list of all available commands."),
  commandHint(`${commandToken("'dark'")}, ${commandToken("'light'")}, or ${commandToken("'system'")}`, " to change the theme."),
  commandHint(commandToken("'contact'"), " to start an email."),
  commandHint(commandToken("'git'"), ` to view my Github or click ${link("here", command.repoLink)}`),
];

const createBanner = (): string[] => {
  const banner: string[] = [];
  banner.push("<br>")
  banner.push(asciiBlock(command.ascii));
  banner.push("<br>");
  banner.push(command.aboutGreeting);
  banner.push("<br>");
  banner.push(bannerContactList([
    bannerRow(rowLabel("fa-solid fa-envelope", "Email"), bannerLink(command.social.email, "email", `mailto:${command.social.email}`)),
    bannerRow(rowLabel("fa-brands fa-github", "Github"), bannerLink(`github/${command.social.github}`, "github", `https://github.com/${command.social.github}`)),
    bannerRow(rowLabel("fa-brands fa-linkedin", "Linkedin"), bannerLink(`www.linkedin.com/in/${command.social.linkedin}`, "linkedin", `https://www.linkedin.com/in/${command.social.linkedin}`)),
  ]));
  banner.push("<br>");
  banner.push(...BANNER_HINTS);
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();
