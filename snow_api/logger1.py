import sys
import logging

# Define formatters
simple_formatter = logging.Formatter('%(asctime)s %(levelname)s: %(message)s', datefmt='%m-%d-%Y %I:%M:%S %p')

start_formatter = logging.Formatter('\n\n======= %(asctime)s %(levelname)s: %(message)s =======\n\n', datefmt='%m-%d-%Y %I:%M:%S %p')

# Define handlers
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.INFO)
console_handler.setFormatter(simple_formatter)

file_handler = logging.FileHandler('./debugtext.log', mode='a')
file_handler.setLevel(logging.DEBUG)
file_handler.setFormatter(simple_formatter)

start_console_handler = logging.StreamHandler(sys.stdout)
start_console_handler.setLevel(logging.DEBUG)
start_console_handler.setFormatter(start_formatter)

start_file_handler = logging.FileHandler('./debugtext.log', mode='a')
start_file_handler.setLevel(logging.DEBUG)
start_file_handler.setFormatter(start_formatter)

# Define loggers
root_logger = logging.getLogger()
root_logger.setLevel(logging.DEBUG)
root_logger.addHandler(console_handler)

logger1 = logging.getLogger('logger1')
logger1.setLevel(logging.DEBUG)
logger1.addHandler(console_handler)
logger1.addHandler(file_handler)
logger1.propagate = False

start_logger = logging.getLogger('startLogger')
start_logger.setLevel(logging.DEBUG)
start_logger.addHandler(start_console_handler)
start_logger.addHandler(start_file_handler)
start_logger.propagate = False

logger = logger1