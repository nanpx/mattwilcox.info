module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// concat: {
		// 	options: {
		// 		separator: '\n;\n'
		// 	},
		// 	basic: {
		// 		src: ['../assets/js/jquery.2.1.1.js','../assets/js/jquery.easing.1.3.js','../assets/js/agegate.jquery.js','../assets/js/main.js'],
		// 		dest: '../assets/js/build/main.js',
		// 	}
		// },
         uglify: {
            my_target: {
                files: {
                    '../domani/assets/js/main.min.js': '../domani/assets/js/main.js'
                }
            }
         },
		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
				},
				files: {
					'../assets/css/styles.css': '../assets/less/main.less',
                    '../domani/assets/css/styles.css': '../domani/assets/less/main.less'
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'../index.html': '../render.html',
                    '../domani/index.html': '../domani/render.html'
				}
			}
		}
	});

	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');

	//grunt.registerTask('default', ['concat','uglify','less','htmlmin']);
	grunt.registerTask('default', ['less','uglify','htmlmin']);
};