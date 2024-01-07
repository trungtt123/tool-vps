const { Semaphore } = require('async-mutex');

const semaphore = new Semaphore(1); // Tạo một Semaphore với giá trị ban đầu là 1

async function monitorEventA() {
  while (true) {
    console.log('Đợi sự kiện A xảy ra');
    // Đợi sự kiện A xảy ra
    await semaphore.acquire();
    
    // Thực hiện các hành động liên quan đến Event A
    console.log('Thực hiện các hành động liên quan đến Event A');
    await sleep(20); // Giả định thực hiện các hành động trong 1 giây
    
    // Giải phóng Semaphore, cho phép B tiếp tục thực hiện
    semaphore.release();
  }
}

async function performActionsInB() {
  while (true) {
    // Thực hiện các hành động trong B
    console.log('Thực hiện các hành động trong B');
    await sleep(1); // Giả định thực hiện các hành động trong 0.5 giây
    
    // Đợi Semaphore trống
    await semaphore.acquire();
    
    // Tiếp tục thực hiện các hành động trong B
    console.log('Tiếp tục thực hiện các hành động trong B');
    await sleep(3); // Giả định thực hiện các hành động trong 1.5 giây
    
    // Giải phóng Semaphore, cho phép A tiếp tục theo dõi
    semaphore.release();
  }
}

async function run() {
  // Chạy cùng lúc cả hai hàm monitorEventA và performActionsInB
  await Promise.all([monitorEventA(), performActionsInB()]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms * 1000));
}

run();
