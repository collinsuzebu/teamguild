import axios from "axios";

class ProjectMarkdown {
  constructor(projectName, todos) {
    this.projectName = projectName;
    this.todos = todos;
  }

  generate() {
    this.output = [];
    this.pending = this.todos.pending;
    this.completed = this.todos.completed;
    this.totalTodos = this.pending.length + this.completed.length;
    this.process();
    return this.output.join("");
  }

  insertLineBreaks(n) {
    for (let i = 0; i < n; i++) {
      this.output.push("\n");
    }
  }

  renderHeader(content, level = 1) {
    var md = "#".repeat(level) + " ";
    if (level === 1) {
      this.output.push(md + content + "\n");
    } else {
      this.insertLineBreaks(1);
      this.output.push(md + content + "\n");
    }
  }

  renderSummary() {
    this.insertLineBreaks(1);
    this.output.push(
      "**Summary:** " +
        `${this.completed.length}/${this.totalTodos} todos completed.` +
        "\n"
    );
  }

  renderListItem(todos) {
    this.renderHeader("Pending", 2);
    if (todos.pending.length === 0) {
      this.output.push("No pending todo." + "\n");
    }
    todos.pending.forEach((todo) => {
      this.output.push("* [ ] " + todo.title + "\n");
    });

    this.renderHeader("Completed", 2);
    if (todos.completed.length === 0) {
      this.output.push("You have not completed any todos." + "\n");
    }
    todos.completed.forEach((todo) => {
      this.output.push("* [x] " + todo.title + "\n");
    });
  }

  process() {
    this.renderHeader(this.projectName, 1);
    this.renderSummary();
    this.renderListItem(this.todos);
  }
}

const postGist = async (gist, token) => {
  return await axios
    .post(`https://api.github.com/gists`, gist, {
      "Content-Type": "application/json",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { ProjectMarkdown, postGist };
