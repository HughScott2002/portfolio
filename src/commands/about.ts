import command from "../../config.json" assert { type: "json" };
import { link, row, rowLabel } from "../shell/format";

const createAbout = (): string[] => {
  const about: string[] = [];
  const EMAIL = "Email";
  const GITHUB = "GitHub";
  const LINKEDIN = "LinkedIn";
  const HUGGINGFACE = "Hugging Face";

  const email = rowLabel("email", EMAIL);
  const github = rowLabel("github", GITHUB);
  const linkedin = rowLabel("linkedin", LINKEDIN);
  const huggingface = rowLabel("huggingFace", HUGGINGFACE);

  about.push("<br>");
  about.push(command.aboutGreeting);
  about.push("<br>");
  about.push(
    row(
      email,
      link(command.social.email, `mailto:${command.social.email}`),
    ),
  );
  about.push(
    row(
      github,
      link(
        `github/${command.social.github}`,
        `https://github.com/${command.social.github}`,
      ),
    ),
  );
  about.push(
    row(
      linkedin,
      link(
        `linkedin/${command.social.linkedin}`,
        `https://www.linkedin.com/in/${command.social.linkedin}`,
      ),
    ),
  );
  about.push(
    row(
      huggingface,
      link(
        `huggingface.co/${command.social.huggingface}`,
        `https://huggingface.co/${command.social.huggingface}`,
      ),
    ),
  );
  about.push("<br>");
  return about;
};

export const ABOUT = createAbout();
