import command from '../../config.json' assert {type: 'json'};
import { asciiBlock, bannerContactList, bannerLink, bannerRow, commandHint, commandToken, link, rowLabel } from '../shell/format';

export const BANNER_HINTS = [
  commandHint(`${commandToken("'help'")} or ${commandToken("'ls'")}`, " for a list of all available commands."),
  commandHint(`${commandToken("'dark'")}, ${commandToken("'light'")}, or ${commandToken("'system'")}`, " to change the theme."),
  commandHint(commandToken("'contact'"), " to start an email."),
  commandHint(commandToken("'git'"), ` to view my GitHub or click ${link("here", command.repoLink)}`),
];

const createBanner = (): string[] => {
  const banner: string[] = [];
  banner.push("<br>")
  banner.push(asciiBlock(command.ascii));
  banner.push("<br>");
  banner.push(command.aboutGreeting);
  banner.push("<br>");
  banner.push(bannerContactList([
    bannerRow(rowLabel("email", "Email"), bannerLink(command.social.email, rowLabel("email", "Email"), `mailto:${command.social.email}`)),
    bannerRow(rowLabel("github", "GitHub"), bannerLink(`github/${command.social.github}`, rowLabel("github", "GitHub"), `https://github.com/${command.social.github}`)),
    bannerRow(rowLabel("linkedin", "LinkedIn"), bannerLink(`www.linkedin.com/in/${command.social.linkedin}`, rowLabel("linkedin", "LinkedIn"), `https://www.linkedin.com/in/${command.social.linkedin}`)),
    bannerRow(rowLabel("huggingFace", "Hugging Face"), bannerLink(`huggingface.co/${command.social.huggingface}`, rowLabel("huggingFace", "Hugging Face"), `https://huggingface.co/${command.social.huggingface}`)),
  ]));
  banner.push("<br>");
  banner.push(...BANNER_HINTS);
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();
