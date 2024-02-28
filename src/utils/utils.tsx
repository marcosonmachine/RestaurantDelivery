export const camel_to_word = (camelStr: string): string =>
{
  const words: string[] = [];
  let start = 0;
  for (let i = 1; i < camelStr.length; i++) {
    if (camelStr.charCodeAt(i) >= 65 && camelStr.charCodeAt(i) <= 90) {
      words.push(camelStr.substring(start, i));
      start = i;
    }
  }
  words.push(camelStr.substring(start));
  return words.join(' ').replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}


export const validateEmail = (emailId: string) =>
{
  const mailformat= /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if(! emailId.match(mailformat)) return "Incorrect email format"
}

export const validatePassword = (password: string) =>
{
  const passwordFormat = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  if(!password.match(passwordFormat)) return "Incorrect password format"
}


export function jsonToUrl(params: Record<string, string | number | string[] | number[]>): string {
  const queryString = Object.entries(params)
  .flatMap(([key, value]) => {
   if (Array.isArray(value)) {
      return value.map((val) => `${key}=${encodeURIComponent(val.toString())}`);
    } else {
      return `${key}=${encodeURIComponent(value.toString())}`;
    }
  }).join('&');
  return queryString;
}
