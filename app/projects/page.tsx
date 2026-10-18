import { getProjects } from "@/lib/projects";
import ProjectsGallery from "./ProjectsGallery";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsGallery projects={projects} />;
}
