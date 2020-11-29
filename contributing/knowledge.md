## Steps

- Fork this repository
- Create a new folder under `contents/knowledge` directory.
- Add `root.yaml` in the new folder
- Add more `{topic}.yaml` in the new folder
- Link each topic's `children` and `resources` accordingly, see below "YAML file format" for more detail.
- Create a pull request

## YAML file format

a knowledge yaml file require these fields

- name: the display name of the topic (e.g. `Operating System`)
- description: One or two sentence to describe the topic, required for `root.yaml`, will be use to display in main page
- resources: the file name of relevant resources (you can find them under `contents/resources` folder)
- children: the file name of children topics for current topic (e.g. `Memory` for Operating System)

File example:

```yaml
---
name: Operating System
description: Learn how software manages computer hardware, resources, and provides common services for computer programs and applications
resources:
  - os_introduction.yaml
  - os_overview.yaml
children:
  - memory.yaml
  - shell.yaml
  - cpu.yaml
```
