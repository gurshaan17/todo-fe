"use client"

import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Define the task type
type Task = {
  id: string
  content: string
  category: 'todo' | 'under-review' | 'in-progress' | 'done'
}

// Define the initial tasks
const initialTasks: Task[] = [
  { id: 'task1', content: 'Create project plan', category: 'todo' },
  { id: 'task2', content: 'Design UI mockups', category: 'under-review' },
  { id: 'task3', content: 'Implement login functionality', category: 'in-progress' },
  { id: 'task4', content: 'Write unit tests', category: 'done' },
  { id: 'task5', content: 'Set up CI/CD pipeline', category: 'todo' },
  { id: 'task6', content: 'Refactor database schema', category: 'under-review' },
  { id: 'task7', content: 'Optimize API endpoints', category: 'in-progress' },
  { id: 'task8', content: 'Deploy to staging environment', category: 'done' },
]

// Define the category order
const categoryOrder = ['todo', 'under-review', 'in-progress', 'done']

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [isKanbanView, setIsKanbanView] = useState(true)

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const updatedTasks = tasks.map(task => {
      if (task.id === draggableId) {
        return { ...task, category: destination.droppableId as Task['category'] }
      }
      return task
    })

    setTasks(updatedTasks)
  }

  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categoryOrder.map((category) => (
        <div key={category} className="space-y-2">
          <h2 className="text-lg font-semibold capitalize">{category.replace('-', ' ')}</h2>
          <Droppable droppableId={category}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 p-4 rounded-md min-h-[200px]"
              >
                {tasks
                  .filter((task) => task.category === category)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2"
                        >
                          <CardContent className="p-4">
                            {task.content}
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  )

  const renderListView = () => (
    <div className="space-y-4">
      {categoryOrder.map((category) => (
        <div key={category}>
          <h2 className="text-lg font-semibold capitalize mb-2">{category.replace('-', ' ')}</h2>
          <Droppable droppableId={category}>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {tasks
                  .filter((task) => task.category === category)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card>
                            <CardContent className="p-4">
                              {task.content}
                            </CardContent>
                          </Card>
                        </li>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      ))}
    </div>
  )

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Tasks</h1>
        <div className="flex items-center space-x-2">
          <Switch
            id="view-mode"
            checked={isKanbanView}
            onCheckedChange={setIsKanbanView}
          />
          <Label htmlFor="view-mode">
            {isKanbanView ? 'Kanban View' : 'List View'}
          </Label>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        {isKanbanView ? renderKanbanView() : renderListView()}
      </DragDropContext>
    </div>
  )
}