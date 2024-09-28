export const formatText = (text: string, to: number) => {
    if(text.length > 50) {
        return text.slice(0, to) + '...'
    } else {
        return text
    }
}