type TimeProps = {
  submitted_at: number;
  time_now: number;
};

export function TimeAgo({
  submitted_at,
  time_now = Date.now() / 1000,
}: TimeProps) {
  const ago = time_now - submitted_at;
  let time: string | number = "";
  let suffix;
  //less than 5 minutes ago
  if (ago < 300) {
    time = "";
    suffix = "just now";
  } else if (ago < 3600) {
    //less than 60 minutes ago
    time = Math.round(ago / 60);
    suffix = " minutes ago";
  } else if (ago < 172800) {
    //less than 2 days ago
    time = Math.round(ago / 3600);
    suffix = time > 1 ? " hours ago" : " hour ago";
  } else {
    time = Math.round(ago / 86400);
    suffix = " days ago";
  }

  return time + suffix;
  // return `${time} ${suffix}`.trim();
}
