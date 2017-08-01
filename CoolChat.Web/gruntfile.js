module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: 'scripts/main.js',
                dest: 'scripts/main.min.js'
            }
        },

        less: {
            development: {
                options: {
                    paths: ['assets/css']
                },
                files: {
                    'app/root/app.component.css': 'app/root/app.component.less',
                    'app/chat-list/chat-list.component.css':  'app/chat-list/chat-list.component.less',
                    'app/chat/chat.component.css': 'app/chat/chat.component.less',
                    'app/messages/messages.component.css': 'app/messages/messages.component.less',
                    'app/log-in/log-in.component.css': 'app/log-in/log-in.component.less',
                    'app/load-waiter/load-waiter.component.css': 'app/load-waiter/load-waiter.component.less'
                }
            }
        },

        watch: {
            scripts: {
                files: ['app/root/*.less', 'app/chat/*.less', 'app/chat-list/*.less', 'app/log-in/*.less', 'app/messages/*.less', 'app/load-waiter/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                },
            } 
        }

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};