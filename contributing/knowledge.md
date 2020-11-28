## Steps

- Fork this repository
- Create a new folder under `contents/knowledge` directory.
- Add `root.yaml` in the new folder
- Add more `{topic}.yaml` in the new folder
- Create a pull request

## YAML file format

a knowledge yaml file require three fields

- name: the display name of the topic (e.g. `Operating System`)
- resources: the file name of relevant resources (you can find them under `contents/resources` folder)
- children: the file name of children topics for current topic (e.g. `Memory` for Operating System)

File example:

```yaml
---
name: Operating System
resources:
  - os_introduction.yaml
  - os_overview.yaml
children:
  - memory.yaml
  - shell.yaml
  - cpu.yaml
```
