<?php
class ThemeV1
{

  function start_import($app, &$theme, $workspace_id, $class)
  {
    $workspace = null;
    if ($workspace_id) {
      $workspace = $app->db->model('workspace')->load($workspace_id);
    }
    $current_workspace_name = $workspace ? $workspace->name : '';

    // 1. Filter Views based on workspace assignments
    $views = isset($theme['views']) ? $theme['views'] : [];
    $new_views = [];
    foreach ($views as $uuid => $view) {
      $workspaces = isset($view['workspaces']) ? $view['workspaces'] : [''];
      if (!is_array($workspaces)) {
        $workspaces = $workspaces ? [$workspaces] : [''];
      }
      $workspaces = array_filter($workspaces);

      if (empty($workspaces)) {
        if ($workspace_id === 0) {
          $new_views[$uuid] = $view;
        }
      } else {
        if ($workspace_id > 0 && in_array($current_workspace_name, $workspaces)) {
          $new_views[$uuid] = $view;
        }
      }
    }
    $theme['views'] = $new_views;
  }
}