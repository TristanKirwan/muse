export const VERIFICATION_EMAIL_SUBJECT = "Verify your Muse account";
export const VERIFICATION_EMAIL_HTML = ({
  url,
  userEmail,
}: {
  url: string;
  userEmail: string;
}) => {
  return `<div style="font-family:'Roboto','Arial',sans-serif;font-size:1.25rem;color:hsl(246,6%,9%)"><span style="font-weight:800; font-size:1.5rem;margin-bottom:1rem;">Hi ${userEmail}👋</span> <br /> You can verify your Muse registration by clicking <a href="${url}" target="_blank">here</a>.<br /><br /> We hope you stay ✨inspired✨</div>`;
};
