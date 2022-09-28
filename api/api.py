# import time
# from flask import Flask

# app = Flask(__name__)

# @app.route('/time')
# def get_current_time():
#     return {'time': time.time()}

from flask import Flask, render_template, request, flash, make_response
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://postgres:postgres@localhost/DB_NAME'

db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:law623@localhost:5433/flasksql_1'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# app.secret_key = 'law623'

class Todos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(80), nullable=False)
    checked = db.Column(db.Boolean, nullable=False)

    def __init__(self, task_name, checked):
        self.task_name = task_name
        self.checked = checked

def format_todo(todo):
    return {
        "id": todo.id,
        "todo": todo.task_name,
        "checked": todo.checked,
    }


# post a todo
@app.route("/addtask", methods=['POST'])
def add_task():
    task_name = request.json['todo']
    checked = request.json['checked']
    todo = Todos(task_name,checked)
    db.session.add(todo)
    db.session.commit()
    return format_todo(todo)

# get all todos
@app.route("/tasks", methods=['GET'])
def get_tasks():
    tasks = Todos.query.order_by(Todos.id.asc()).all()
    task_list = []
    for task in tasks:
        task_list.append(format_todo(task))
    return {'tasks': task_list}

# delete a todo
@app.route("/deletetask/<id>", methods=['DELETE'])
def delete_task(id):
    task = Todos.query.filter_by(id=id).one()
    db.session.delete(task)
    db.session.commit()
    return f'Todo (id: {id}) deleted!'

@app.route('/updatetask/<id>', methods=['PUT'])
def update_task(id):
    task = Todos.query.filter_by(id=id)
    todo = request.json['todo']
    checked = False
    task.update(dict(task_name = todo, checked = checked))
    db.session.commit()
    return {'task': format_todo(task.one())}

if __name__ == '__main__':
    db.create_all()
    app.run()