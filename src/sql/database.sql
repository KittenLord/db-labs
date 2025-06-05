CREATE TABLE "User" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    nickname TEXT UNIQUE NOT NULL,  
    email TEXT UNIQUE NOT NULL,   
    password TEXT NOT NULL,   
    photo TEXT    
);

CREATE TABLE "User_Project" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id UUID NOT NULL,
    project_id UUID NOT NULL,
    role_id UUID,
    team_id UUID
);

CREATE TABLE "Project" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    name TEXT NOT NULL   
);

CREATE TABLE "Team" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    name TEXT NOT NULL,
    project_id UUID NOT NULL
);

CREATE TABLE "Task" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    name TEXT NOT NULL,
    description TEXT,
    startDate TIMESTAMPTZ DEFAULT NOW(),
    deadlineDate TIMESTAMPTZ,
    team_id UUID NOT NULL
);

CREATE TABLE "Artifact" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    status TEXT NOT NULL,
    comment TEXT,
    datetime TIMESTAMPTZ DEFAULT NOW(),
    task_id UUID NOT NULL
);

CREATE TABLE "Role" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    name TEXT NOT NULL,
    description TEXT,
    project_id UUID NOT NULL
);

CREATE TABLE "Role_Action" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    role_id UUID NOT NULL,
    action_id UUID NOT NULL
);

CREATE TABLE "Action" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    action TEXT UNIQUE NOT NULL
);

CREATE TABLE "Event" (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(), 
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    action TEXT NOT NULL,
    datetime TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_user
    FOREIGN KEY(user_id)
    REFERENCES "User"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_project
    FOREIGN KEY(project_id)
    REFERENCES "Project"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_role
    FOREIGN KEY(role_id)
    REFERENCES "Role"(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE "User_Project" ADD
    CONSTRAINT fk_user_project_team
    FOREIGN KEY(team_id)
    REFERENCES "Team"(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;

ALTER TABLE "Team" ADD
    CONSTRAINT fk_team_project
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Task" ADD
    CONSTRAINT fk_task_team
    FOREIGN KEY (team_id)
    REFERENCES "Team"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Artifact" ADD
    CONSTRAINT fk_artifact_task
    FOREIGN KEY (task_id)
    REFERENCES "Task"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Role" ADD
    CONSTRAINT fk_role_project
    FOREIGN KEY (project_id)
    REFERENCES "Project"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Role_Action" ADD
    CONSTRAINT fk_role_action_role
    FOREIGN KEY(role_id)
    REFERENCES "Role"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Role_Action" ADD
    CONSTRAINT fk_role_action_action
    FOREIGN KEY(action_id)
    REFERENCES "Action"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Event" ADD
    CONSTRAINT fk_event_user
    FOREIGN KEY(user_id)
    REFERENCES "User"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;

ALTER TABLE "Event" ADD
    CONSTRAINT fk_event_role
    FOREIGN KEY(role_id)
    REFERENCES "Role"(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE;
