
export function formatDate(iso: string){
    if(iso == null || undefined){ return "N/A" }
    return new Date(iso).toLocaleString("sr-RS");
}

export function getDateWithoutHourPart(date: Date) {
    const pureDate = new Date(date);
    pureDate.setHours(0, 0, 0, 0);
    return pureDate;
}

export function pureDateString(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function formatMinutesToHours(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if(remainingMinutes == 0) return `${hours}h`
    else return `${hours}h ${remainingMinutes}min`;
}
