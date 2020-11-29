## Steps

- Fork this repository
- Add a new yaml file (e.g. `mit600001.yaml`) in `contents/resources` folder
- Link new filename in relevant topic's `resources` field, see [topic format](https://github.com/noobpedia/noobpedia/tree/master/contributing/knowledge.md) for more detail.
- Create a pull request

## YAML file format

a resource yaml file require these fields

- name: the display name of the resource (e.g. `MIT 6.0001 Intro to cs`)
- link: the url link to view the resources
- type: the type of the resource (current options: "video", "reading")
- length: the length to finish the resource **in minutes**

File example:

```yaml
---
name: MIT 6.0001
link: https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/
type: online course
length: 2160
```
