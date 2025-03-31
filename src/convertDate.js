export default function convertDate(date) {
    let normalDate = new Date(date);

    normalDate = normalDate.toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return normalDate;
}