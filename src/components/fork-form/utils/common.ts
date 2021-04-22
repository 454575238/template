export function get(entity: any, path: (string | number)[]) {
  let current = entity
  for (let i = 0; i < path.length; i++) {
    if (!current) return undefined
    current = current[path[i]]
  }

  return current
}

export function set<Entity = any, Output = any, Value = any>(
  entity: Entity,
  paths: (string | number)[],
  value: Value,
  removeIfUndefined: boolean,
) {
  if (
    paths.length &&
    removeIfUndefined &&
    value === undefined &&
    !get(entity, paths.slice(0, -1))
  ) {
    return entity
  }
}
