# time-slicing
Break down long tasks into smaller tasks, avoid blocking the main process.

## Introduce

Usually synchronous code execution for more than 50 milliseconds is a long task.

Long tasks will block the main thread, causing the page to jam, We have two solutions, Web worker and Time slicing.

We should use web workers as much as possible, but the web worker cannot access the DOM. So we need to split a long task into small tasks and distribute them in the macrotask queue.

For example：

```javascript
setTimeout(_ => {
  const start = performance.now()
  while (performance.now() - start < 1000) {}
  console.log('done!')
}, 5000)
```
The browser will get stuck for one second after the code is executed for five seconds. 

We can use the chrome developer tool to capture the performance of the code run.

![](https://s3.amazonaws.com/media-p.slid.es/uploads/743702/images/5616444/long-task.png)

Now, we use time-slicing to cut long tasks, the code is as follows:

```javascript
setTimeout(ts(function* () {
  const start = performance.now()
  while (performance.now() - start < 1000) {
    yield
  }
  console.log('done!')
}), 5000)
```
In the code, we use the **yield** keyword to split the code and distribute the code in different macrotask queues.

We can use the chrome developer tool to capture the performance of the code run.

![](https://s3.amazonaws.com/media-p.slid.es/uploads/743702/images/5616903/pasted-from-clipboard.png)

From the figure we can see that the long task is gone, and replaced by a myriad of intensive small tasks.
