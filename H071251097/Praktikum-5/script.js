
let currentUserId = null; 
let currentUserName = ""; 
let currentTasks = []; 

const membersListEl = document.getElementById("members-list"); 
const membersStatusEl = document.getElementById("members-status");

const taskHeaderEl = document.getElementById("task-header"); 
const taskProgressEl = document.getElementById("task-progress"); 
const taskContentArea = document.getElementById("task-content-area");

const statTotalEl = document.getElementById("stat-total");
const statCompletedEl = document.getElementById("stat-completed");
const statPercentEl = document.getElementById("stat-percent");

const searchInput = document.getElementById("search-input");
const noSearchResultsEl = document.getElementById("no-search-results");

const addTaskForm = document.getElementById("add-task-form");
const taskInput = document.getElementById("task-input");
const saveButton = document.getElementById("save-button");
const formErrorEl = document.getElementById("form-error");
const toastSuccessEl = document.getElementById("toast-success");

const tasksListEl = document.getElementById("tasks-list");

document.addEventListener("DOMContentLoaded", () => { 
  fetchMembers(); 
  setupEventListeners(); 
});

function setupEventListeners() {
  searchInput.addEventListener("input", handleSearch); 
  addTaskForm.addEventListener("submit", handleAddTask); 
}

async function fetchMembers() { 
  membersStatusEl.textContent = "Memuat anggota..."; 
  membersStatusEl.className = "text-xs mb-3 px-2 text-pink-500 font-medium animate-pulse";
  
  try { 
    const response = await fetch("https://jsonplaceholder.typicode.com/users"); 
    if (!response.ok) { 
      throw new Error(`Gagal memuat data anggota (Status: ${response.status})`); 
    }
    
    const users = await response.json(); 
    membersStatusEl.textContent = ""; 
    renderMembers(users); 
  } catch (error) { 
    membersStatusEl.textContent = error.message || "Gagal mengambil data anggota."; 
    membersStatusEl.className = "text-xs mb-3 px-2 text-rose-500 font-medium";
  }
}

function renderMembers(users) { 
  membersListEl.innerHTML = ""; 
  
  users.forEach((user) => { 
    const btn = document.createElement("button"); 
    btn.textContent = user.name; 
    btn.dataset.userId = user.id; 
    btn.className = "w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-gray-600 hover:bg-pink-50 hover:text-pink-600 flex items-center justify-between"; 
    
    btn.addEventListener("click", () => handleMemberClick(user.id, user.name, btn)); 
    
    membersListEl.appendChild(btn); 
  });
}

function handleMemberClick(userId, userName, selectedBtn) { 
  currentUserId = userId; 
  currentUserName = userName; 

  
  const buttons = membersListEl.querySelectorAll("button"); 
  buttons.forEach((btn) => { 
    btn.classList.remove("bg-pink-500", "text-white", "shadow-sm"); 
    btn.classList.add("text-gray-600", "hover:bg-pink-50", "hover:text-pink-600"); 
  });
  
  selectedBtn.classList.remove("text-gray-600", "hover:bg-pink-50", "hover:text-pink-600"); 
  selectedBtn.classList.add("bg-pink-500", "text-white", "shadow-sm"); 

  fetchUserTasks(userId, userName); 
}




async function fetchUserTasks(userId, userName) { 
  taskHeaderEl.textContent = `Tugas ${userName}`; 
  taskProgressEl.textContent = ""; 
  tasksListEl.innerHTML = ""; 
  taskContentArea.classList.add("hidden"); 
  
  tasksStatusEl.textContent = "Memuat tugas...";
  tasksStatusEl.className = "text-sm mb-4 text-pink-500 font-medium animate-pulse";

  searchInput.value = ""; 
  taskInput.value = ""; 
  hideFormError(); 

  try { 
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    if (!response.ok) { 
      throw new Error(`Gagal memuat tugas (Status: ${response.status})`); 
    }

    currentTasks = await response.json(); 
    tasksStatusEl.textContent = ""; 
    taskContentArea.classList.remove("hidden"); 

    renderTasks(); 
    updateProgressSummary(); 
  } catch (error) { 
    tasksStatusEl.textContent = error.message || "Gagal mengambil data tugas."; 
    tasksStatusEl.className = "text-sm mb-4 text-rose-500 font-medium";
  }
}

function renderTasks() { 
  tasksListEl.innerHTML = ""; 

  currentTasks.forEach((task) => { 
    const li = createTaskElement(task); 
    tasksListEl.appendChild(li); 
  });

  checkSearchResults(); 
}

function createTaskElement(task) { 
  const li = document.createElement("li"); 
  li.className = "flex items-center justify-between p-3.5 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition gap-3"; 

  
  const titleSpan = document.createElement("span"); 
  titleSpan.textContent = task.title; 
  titleSpan.className = "text-sm font-medium flex-1 break-words text-gray-700"; 
  
  if (task.completed) { 
    titleSpan.classList.add("line-through", "text-gray-400"); 
  }

  
  const actionDiv = document.createElement("div"); 
  actionDiv.className = "flex items-center gap-2 flex-shrink-0"; 

  
  if (!task.completed) { 
    const completeBtn = document.createElement("button"); 
    completeBtn.textContent = "Tandai selesai"; 
    completeBtn.className = "px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 active:scale-95 transition shadow-sm"; 
    
    completeBtn.addEventListener("click", () => { 
      task.completed = true; 
      titleSpan.classList.add("line-through", "text-gray-400"); 
      completeBtn.remove(); 
      updateProgressSummary(); 
    });
    
    actionDiv.appendChild(completeBtn); 
  }
  
  const deleteBtn = document.createElement("button"); 
  deleteBtn.textContent = "Hapus"; 
  deleteBtn.className = "px-3 py-1.5 text-xs font-semibold bg-rose-500 text-white rounded-lg hover:bg-rose-600 active:scale-95 transition shadow-sm";
  
  deleteBtn.addEventListener("click", () => { 
    currentTasks = currentTasks.filter((t) => t !== task); 
    li.remove(); 
    updateProgressSummary(); 
    checkSearchResults(); 
  });

  actionDiv.appendChild(deleteBtn); 

  li.appendChild(titleSpan); 
  li.appendChild(actionDiv); 

  return li; 
}

function updateProgressSummary() { 
  const total = tasksListEl.children.length; 
  const completedCount = Array.from(tasksListEl.children).filter((li) => { 
    const span = li.querySelector("span"); 
    return span && span.classList.contains("line-through"); 
  }).length; 

  
  taskProgressEl.textContent = `${completedCount} dari ${total} tugas selesai`; 

  
  statTotalEl.textContent = total; 
  statCompletedEl.textContent = completedCount; 
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0; 
  statPercentEl.textContent = `${percentage}% Progres`; 
}




function handleSearch() { 
  const query = searchInput.value.trim().toLowerCase(); 
  
  const items = tasksListEl.children; 
  for (let i = 0; i < items.length; i++) { 
    const li = items[i]; 
    const span = li.querySelector("span"); 
    const title = span ? span.textContent.toLowerCase() : ""; 

    if (title.includes(query)) { 
      li.classList.remove("hidden"); 
    } else { 
      li.classList.add("hidden"); 
    }
  }

  checkSearchResults(); 
}

function checkSearchResults() { 
  const visibleItems = Array.from(tasksListEl.children).filter( 
    (li) => !li.classList.contains("hidden") 
  );

  if (visibleItems.length === 0 && tasksListEl.children.length > 0) { 
    noSearchResultsEl.classList.remove("hidden");
  } else {
    noSearchResultsEl.classList.add("hidden");
  }
}




function simpanTugas(judul) { 
  return new Promise((resolve, reject) => { 
    setTimeout(() => { 
      const isDuplicate = currentTasks.some( 
        (task) => task.title.trim().toLowerCase() === judul.trim().toLowerCase() 
      );

      if (isDuplicate) { 
        reject(new Error("Tugas dengan judul ini sudah ada di dalam daftar."));
      } else {
        resolve({ 
          title: judul, 
          completed: false 
        });
      }
    }, 1000); 
  });
}

async function handleAddTask(event) { 
  event.preventDefault(); 
  hideFormError(); 

  const judulBaru = taskInput.value.trim(); 

  if (!judulBaru || judulBaru.length < 5) { 
    showFormError("Judul tugas tidak boleh kosong dan minimal 5 karakter."); 
    return; 
  }

  saveButton.textContent = "Menyimpan..."; 
  saveButton.disabled = true; 

  try { 
    const taskBaru = await simpanTugas(judulBaru); 
    
    currentTasks.push(taskBaru); 
    const li = createTaskElement(taskBaru); 
    tasksListEl.appendChild(li); 

    updateProgressSummary(); 
    taskInput.value = ""; 
    
    handleSearch(); 
    showToastSuccess(); 
  } catch (error) { 
    showFormError(error.message); 
  } finally { 
    saveButton.textContent = "Simpan"; 
    saveButton.disabled = false; 
  }
}

function showFormError(message) { 
  formErrorEl.textContent = message; 
  formErrorEl.classList.remove("hidden"); 
}

function hideFormError() { 
  formErrorEl.textContent = ""; 
  formErrorEl.classList.add("hidden"); 
}

function showToastSuccess() { 
  toastSuccessEl.classList.remove("hidden"); 
  setTimeout(() => { 
    toastSuccessEl.classList.add("hidden"); 
  }, 3000);
}
