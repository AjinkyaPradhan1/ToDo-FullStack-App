package com.springrest.restfulwebservices.todo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.stereotype.Service;



@Service
public class toDoService {
	private static List<Todo> todos = new ArrayList<>();
	private static int todosCount = 0;
	
	static {
		todos.add(new Todo(++todosCount, "Ajinkya","Get AWS Certified", LocalDate.now().plusYears(15), false ));
		todos.add(new Todo(++todosCount, "Ajinkya","Learn Java", 	LocalDate.now().plusYears(11), false ));
		todos.add(new Todo(++todosCount, "Ajinkya","Learn Full Stack Development", 	LocalDate.now().plusYears(12), false ));
		todos.add(new Todo(++todosCount, "Ajinkya","Learn ReactJS", 	LocalDate.now().plusYears(12), false ));
		todos.add(new Todo(++todosCount, "Ajinkya","Learn C++", 	LocalDate.now().plusYears(9), false ));
	}
	
	public List<Todo> findByUsername(String username){
		Predicate<? super Todo> predicate = todo->todo.getUsername().equalsIgnoreCase(username);
		return todos.stream().filter(predicate).toList();
	}
	
	public Todo addTodo(String username,String description,LocalDate targetDate,boolean done) {
		Todo todo = new Todo(++todosCount,username,description,targetDate,done);
		todos.add(todo);
		return todo;
	}
	public void deleteToDoById(int id) {
		
		Predicate<? super Todo> predicate = todo->todo.getId()==id;	//check id of each todo, if the id matches , remove the todo
		todos.removeIf(predicate);
	}
	public Todo findById(int id) {
		Predicate<? super Todo> predicate = todo->todo.getId()==id;
		Todo todo = todos.stream().filter(predicate).findFirst().get();	//filtering from the stream of todos available
		return todo;
	}
	public void updateTodo(Todo todo) {
		deleteToDoById(todo.getId());
		todos.add(todo);
	}
}
