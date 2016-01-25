$.fn.extend({
	filePicker: function(options) {
		console.log('Gooo File Picker');
		var setPreview, updatePreview, clearPreview;
		var clearInput;
		var setFileName, clearFilename;
		var setFileIcon, clearFileIcon;

		var $fileIcon = $('.file-input-file-icon');

		var mapFileExtensionToIconConstant;

		var settings;
		var initialImg;

		settings = {
			dropOverClass: 'drop-over',
			filePatterns: {
				'IMG': {
					icon: 'file-image-o',
					match: /\.(gif|jpg|jpeg|tiff|png)$/i
				},
				//'FALLBACK': 'file-o',
				//'PDF': 'file-pdf-o',
				//'VIDEO': 'file-video-o',
				//'PRESENTATION': 'file-powerpoint-o',
				//'AUDIO': 'file-audio-o',
				//'SPREADSHEET': 'file-excel-o',
				//'RICHTEXT': 'file-word-o',
				//'TEXT': 'file-text-o',
				//'ARCHIVE': 'file-archive-o',
				'CODE': {
					icon: 'file-code-o',
					match: /\.(php|js|css|html|json)$/i
				}
			},
			disablePreview: false,
			selectImg: function($dropZone) {
				return $dropZone.find('img');
			},
			selectInput: function($dropZone) {
				return $dropZone.find(':file');
			}
		};

		settings = $.extend(settings, options);

		mapFileExtensionToIconConstant = function(file) {
			for(var key in settings.filePatterns) {
				if(settings.filePatterns.hasOwnProperty(key)) {
					if(checkFiletype(settings.filePatterns[key], file.name)) {
						return settings.filePatterns[key].icon;
					}
				}
			}

			function checkFiletype(filePattern, file) {
				return file.match(filePattern.match);
			}
		};
		setFileIcon = function($icon, iconClass) {
			$icon.addClass(iconClass);
		};
		removeFileIcon = function($icon, iconClass) {
			$icon.removeClass(iconClass);
		};

		setPreview = function($img, content) {
			if ($img) {
				return $img.prop('src', content);
			}
		};

		clearPreview = function($img) {
			if($img.prop('src') !== initialImg) {
				$img.prop('src', initialImg || settings.placeholderImage);
			}
		};

		updatePreview = function($img, file) {
			var reader;
			console.log(mapFileExtensionToIconConstant(file));
			if (!settings.disablePreview && $img) {
				if (file.type.match(/image[\/\-\w]*/)) {
					reader = new FileReader();
					reader.onload = function(ev) {
						return setPreview($img, ev.target.result);
					};
					return reader.readAsDataURL(file);
				} else {
					setFileIcon($fileIcon, mapFileExtensionToIconConstant(file))
					return setPreview($img, '');
				}
			}
		};

		clearInput = function($input) {
			$input.wrap('<form>').closest('form').get(0).reset();
			$input.unwrap();
		};

		setFileName = function($label, filename) {
			$label.val(filename || '');
		};

		clearFilename = function($label) {
			$label.val('');
		};

		return this.each(function() {

			var $dropZone, $img, $input, $clearButton, $fileLabel;

			$dropZone = $(this);

			if (!settings.disablePreview) {
				$img = settings.selectImg($dropZone);
				initialImg = $img.prop('src');
			}

			$input = settings.selectInput($dropZone);

			$clearButton = $('.file-input-clear');
			$fileLabel = $('.file-input-filename');

			this.ondrop = function(e) {
				var files;
				if (e.dataTransfer && (files = e.dataTransfer.files)) {
					$input.prop('files', files);
					if ($input.prop('files') === files) {
						e.preventDefault();
						updatePreview($img, files[0]);
						return false;
					}
				}
			};

			this.ondragover = function(e) {
				if (e.dataTransfer && e.dataTransfer.files) {
					return e.preventDefault();
				}
			};

			$clearButton.on('click', function(e) {
				e.preventDefault();
				clearPreview($img);
				clearInput($input);
				clearFilename($fileLabel);
			});

			return $input.change(function() {
				var files;
				if ((files = this.files)) {
					console.log(files[0].name);
					setFileName($fileLabel, files[0].name);

					return updatePreview($img, files[0]);
				} else {
					return setPreview($img, '');
				}
			});

		});
	}
});

$(function() {
	return $('.file-picker').filePicker();
});
