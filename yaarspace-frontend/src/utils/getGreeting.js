export const getGreeting = (name) => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return `Hello, ${name}. Fresh day, fresh code. Find a team.`;
  } else if (hour >= 12 && hour < 18) {
    return `Good afternoon, ${name}. Time to ship some code.`;
  } else {
    return `Evening, ${name}. Your next big win starts tonight.`;
  }
};