export function filterTasks(tasks: any[], search: string) {
    return tasks.filter(
        (task) =>
            task.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            task.description
                .toLowerCase()
                .includes(search.toLowerCase())
    );
}