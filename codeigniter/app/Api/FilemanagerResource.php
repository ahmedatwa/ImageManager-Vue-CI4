<?php

namespace App\Api;

use CodeIgniter\RESTful\ResourceController;

class FilemanagerResource extends ResourceController
{
    public function index()
    {
        $data['headingTitle'] = lang('filemanager.headingTitle');

        if($this->request->getVar('thumb')) {
            $data['thumb'] = esc($this->request->getVar('thumb'));
        } else {
            $data['thumb'] = '';
        }


        if($this->request->getVar('input')) {
            $data['input'] = esc($this->request->getVar('input'));
        } else {
            $data['input'] = '';
        }


        $data['user_token'] = session()->get('user_token');

        return view('filemanager', $data);
    }

    public function list()
    {
        $json = [];

        helper('filesystem');

        $allowed = [
            '.ico',
            '.jpg',
            '.jpeg',
            '.png',
            '.gif',
            '.webp',
            '.JPG',
            '.JPEG',
            '.PNG',
            '.GIF',
           // '.mp4'
        ];

        $base = ROOTPATH . "public/images/";

        if($this->request->getVar('directory')) {
            $directory = $base . html_entity_decode($this->request->getVar('directory'), ENT_QUOTES, 'UTF-8') . '/';
        } else {
            $directory = $base . 'catalog/';
        }

        $paths = directory_map($directory, 1);

        foreach($paths as $path) {

            $basename = basename($path, PATHINFO_BASENAME);

            if (strrpos($path, '/')) {
                $json[] = [
                    'name' => $basename,
                    'type'  => 'directory',
                    'path'  => substr($directory . $path, strlen($base)),
                    'href'  => site_url('filemanager/list?usertoken=' . session()->get('usertoken')) . '&directory=' . rtrim(substr($directory . $path, strlen($base)), '/')
                ];
            }

            if (!strrpos($path, '/') && in_array(substr($path, strrpos($path, '.')), $allowed)) {

                $thumb = $this->processThumb(substr($directory . $path, strlen($base)));

                $json[] = [
                    'name'  => $basename,
                    'type'  => 'image',
                    'path'  => substr($directory . $path, strlen($base)),
                    'href'  => base_url() .'images/' . substr($directory, strlen($base)) . $basename,
                    'thumb' =>  $thumb,
                ];
            }
        }

        sort($json);

        return $this->respond($json, 200);

    }

    protected function processThumb(string $filename, int $width = 136, int $height = 136): string
    {

        $imageDir = ROOTPATH . 'public/images/';
        $cachePath = ROOTPATH . 'public/images/cache/';

        $imageExt = pathinfo($filename, PATHINFO_EXTENSION);

        $allowed = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'webp',
            'JPG',
            'JPEG',
            'PNG',
            'GIF'
        ];

        // double check type is extension
        if (!in_array($imageExt, $allowed)) {
            return base_url('images/') . $filename;
        }


        $thumb = substr($filename, 0, strpos($filename, '.')) . '_' . $width . 'x' . $height . '_thumb.' . $imageExt ;

        $originalFilePath  = $imageDir . $filename;

        $explode = explode('/', $filename);

        array_pop($explode);

        $newSavePath = $cachePath . implode('/', $explode);


        if(!is_dir($newSavePath)) {
            @mkdir($newSavePath, 0755, true);
        }

        if(!file_exists($cachePath . $thumb)) {
            try {
                \Config\Services::image()->withFile($originalFilePath)
                ->resize($width, $height, false, 'height')
                ->save($cachePath . $thumb);
            } catch (CodeIgniter\Images\Exceptions\ImageException $e) {
                log_message('error', $e->getMessage());
                copy($originalFilePath, $cachePath . $thumb);
            }
        }

        return base_url() . 'images/cache/' . $thumb;
    }

    public function createFolder()
    {
        $json = [];

        // Make sure we have the correct directory
        if ($this->request->getVar('directory')) {
            $directory = ROOTPATH . 'public/images/' . rtrim($this->request->getVar('directory'), '/');
        } else {
            $directory = ROOTPATH . 'public/images/catalog/';
        }

        // Check its a directory
        if (!is_dir($directory)) {
            $json['error'] = lang('filemanager.error.errorDirectory');
        }

        if (!$json) {
            // Sanitize the folder name
            $folder = $this->request->getVar('folder');

            // Validate the filename length
            if ((strlen($folder) < 3) || (strlen($folder) > 128)) {
                $json['error'] = lang('filemanager.error.errorFolder');
            }
            // Check if directory already exists or not
            if (is_dir($directory . '/' . $folder)) {
                $json['error'] = lang('filemanager.error.errorExists');
            }
        }

        if($json) {
            return $this->fail($json, 400);
        } else {
            mkdir($directory . '/' . $folder, 0777);

            chmod($directory . '/' . $folder, 0777);

            @touch($directory . '/' . $folder . '/' . 'index.html');

            $json['success'] = lang('filemanager.textDirectory');
        }

        return $this->respond($json, 200);
    }

    public function doDelete()
    {
        $json = [];

        // Check user has permission

        $base = ROOTPATH . 'public/images/catalog/';

        if ($this->request->getVar('path')) {
            $paths = $this->request->getVar('path');
        } else {
            $paths = [];
        }

        foreach ($paths as $path) {
            $path = html_entity_decode($path, ENT_QUOTES, 'UTF-8');
            // Check path exsists
            if ($path == $base) {
                $json['error'] = lang('filemanager.error.errorDelete');
                break;
            }
        }

        if($json) {
            return $this->fail($json, 400);
        } else {
            // Loop through each path
            foreach ($paths as $path) {
                $path = rtrim(ROOTPATH . 'public/images/' . $path, '/');

                // If path is just a file delete it
                if (is_file($path)) {
                    unlink($path);
                }
                // If path is a directory
                if (is_dir($path)) {
                    helper('filesystem');
                    //beging deleting each file and sub folder
                    delete_files($path, true);
                    // remove the folder
                    rmdir($path);
                }
            }
            $json['success'] = lang('filemanager.textDelete');
        }

        return $this->respond($json, 200);
    }

    public function upload()
    {
        $json = [];

        // Check user has permission

        $dirImage = ROOTPATH . "public/images/";

        // Make sure we have the correct directory
        if ($this->request->getVar('directory')) {
            $directory = $dirImage . $this->request->getVar('directory');
        } else {
            $directory = $dirImage . 'catalog/';
        }

        // Check its a directory
        if (!is_dir($directory)) {
            $json['error'] = lang('filemanager.error.errorDirectory');
        }

        // Allowed file extension types
        $extensions = ['jpg','jpeg','gif','png', 'bmp', 'mp4', 'webm'];
        // Allowed file mime types
        $mimes = ['image/jpeg','image/pjpeg','image/png','image/x-png','image/gif', 'image/bmp', 'video/webm', 'video/mp4'];

        if ($files = $this->request->getFiles()) {

            foreach ($files as $file) {
                $filename = $file->getName();
                $fileExtenstion = $file->getClientExtension();
                $fileType = $file->getClientMimeType();

                if (! $file->isValid()) {
                    $json['error'] = ($file->getErrorString().'('.$file->getError().')');
                }

                if (!in_array($fileExtenstion, $extensions)) {
                    $json['error'] = lang('filemanager.error.errorFileType');
                }

                if (!in_array($fileType, $mimes)) {
                    $json['error'] = lang('filemanager.error.errorFileType');
                }

                if($json) {
                    return $this->fail($json, 400);
                } else {
                    if ($file->isValid() && ! $file->hasMoved()) {
                        $file->move($directory);
                        $json['success'] = lang('filemanager.textUploaded');
                    }
                }
            }
        }
        return $this->respond($json, 200);
    }

    // -------------------
}
