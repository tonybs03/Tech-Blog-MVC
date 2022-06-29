async function createPostHandler(event) {
    event.preventDefault();
    document.location.replace('/dashboard/newpost')
}

document.querySelector('#new-post-btn').addEventListener('click', createPostHandler);