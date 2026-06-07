import command from '../../config.json' assert {type: 'json'};

const createBanner = () : string[] => {
  const banner : string[] = [];
  banner.push("<br>")
  command.ascii.forEach((ele) => {
    let bannerString = "";
    //this is for the ascii art
    for (let i = 0; i < ele.length; i++) {
      if (ele[i] === " ") {
        bannerString += "&nbsp;";
      } else {
        bannerString += ele[i];
      }
    }
    
    let eleToPush = `<pre>${bannerString}</pre>`;
    banner.push(eleToPush);
  });  
  banner.push("<br>");
  banner.push(command.aboutGreeting);
  banner.push("<br>");
  banner.push(`&nbsp;&nbsp;&nbsp;<i class='fa-solid fa-envelope'></i> Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='mailto:${command.social.email}'>${command.social.email}</a>`);
  banner.push(`&nbsp;&nbsp;&nbsp;<i class='fa-brands fa-github'></i> Github&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://github.com/${command.social.github}'>github/${command.social.github}</a>`);
  banner.push(`&nbsp;&nbsp;&nbsp;<i class='fa-brands fa-linkedin'></i> Linkedin&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' href='https://www.linkedin.com/in/${command.social.linkedin}'>linkedin/${command.social.linkedin}</a>`);
  banner.push("<br>");
  banner.push("Type <span class='command'>'help'</span> or <span class='command'>'ls'</span> for a list of all available commands.");
  banner.push(`Type <span class='command'>'repo'</span> to view the GitHub repository or click <a href='${command.repoLink}' target='_blank'>here</a>.`);
  banner.push("<br>");
  return banner;
}

export const BANNER = createBanner();
