export default function formatDate(date: Date) {
    return date.toLocaleString('en-US', { dateStyle: 'short' });
}