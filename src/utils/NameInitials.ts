export const findIntials = (fullName: string) => {
    const name = fullName.trim();
    const firstIndex = name.indexOf(' ');
    const lastIndex = name.lastIndexOf(' ');
    const firstName = name.substring(0, firstIndex);
    const lastName = name.substring(lastIndex + 1, name.length);
    const initials = firstName.charAt(0) + '' + lastName.charAt(0);
    return initials;
};
