export const formatAuthors = (authorNames: string[]) => {
	const maxLength = 30;
	const authorNamesString = authorNames.join(', ');
	if (authorNamesString.length <= maxLength) {
		return authorNamesString;
	} else {
		return authorNamesString.slice(0, maxLength) + '...';
	}
};
